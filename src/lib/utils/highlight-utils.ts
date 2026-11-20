
import type { Highlight } from "@/lib/reader/highlights";

const TEXT_NODE_FILTER = {
  acceptNode(node: Node): number {
    const parent = node.parentElement;

    if (!parent || parent.closest("[data-reader-ui]")) {
      return NodeFilter.FILTER_REJECT;
    }

    return NodeFilter.FILTER_ACCEPT;
  },
};

function getTextNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    TEXT_NODE_FILTER,
  );

  const nodes: Text[] = [];

  let current = walker.nextNode();

  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }

  return nodes;
}

function getNodeOffset(
  root: HTMLElement,
  targetNode: Node,
  targetOffset: number,
): number | null {
  let total = 0;

  for (const node of getTextNodes(root)) {
    if (node === targetNode) {
      return total + targetOffset;
    }

    total += node.textContent?.length ?? 0;
  }

  return null;
}

export function getSelectionData(): {
  chapterSlug: string;
  blockId: string;
  text: string;
  startOffset: number;
  endOffset: number;
} | null {
  const selection = window.getSelection();

  if (!selection || selection.isCollapsed || !selection.rangeCount) {
    return null;
  }

  const range = selection.getRangeAt(0);

  const startElement =
    range.startContainer instanceof Element
      ? range.startContainer
      : range.startContainer.parentElement;

  const endElement =
    range.endContainer instanceof Element
      ? range.endContainer
      : range.endContainer.parentElement;

  const startBlock = startElement?.closest<HTMLElement>(
    "[data-highlight-block]",
  );

  const endBlock = endElement?.closest<HTMLElement>(
    "[data-highlight-block]",
  );

  if (!startBlock || startBlock !== endBlock) {
    return null;
  }

  const chapterSlug = startBlock.dataset.chapterSlug;
  const blockId = startBlock.dataset.blockId;

  if (!chapterSlug || !blockId) {
    return null;
  }

  const startOffset = getNodeOffset(
    startBlock,
    range.startContainer,
    range.startOffset,
  );

  const endOffset = getNodeOffset(
    startBlock,
    range.endContainer,
    range.endOffset,
  );

  if (
    startOffset === null ||
    endOffset === null ||
    endOffset <= startOffset
  ) {
    return null;
  }

  return {
    chapterSlug,
    blockId,
    text: selection.toString(),
    startOffset,
    endOffset,
  };
}

export function createHighlightRange(
  root: HTMLElement,
  highlight: Highlight,
): Range | null {
  const nodes = getTextNodes(root);

  let currentOffset = 0;
  let startPoint: { node: Text; offset: number } | null = null;
  let endPoint: { node: Text; offset: number } | null = null;

  for (const node of nodes) {
    const length = node.textContent?.length ?? 0;
    const nodeStart = currentOffset;
    const nodeEnd = currentOffset + length;

    if (
      !startPoint &&
      highlight.startOffset >= nodeStart &&
      highlight.startOffset < nodeEnd
    ) {
      startPoint = {
        node,
        offset: highlight.startOffset - nodeStart,
      };
    }

    if (
      highlight.endOffset > nodeStart &&
      highlight.endOffset <= nodeEnd
    ) {
      endPoint = {
        node,
        offset: highlight.endOffset - nodeStart,
      };
    }

    currentOffset = nodeEnd;
  }

  if (!startPoint || !endPoint) {
    return null;
  }

  const range = document.createRange();

  range.setStart(startPoint.node, startPoint.offset);
  range.setEnd(endPoint.node, endPoint.offset);

  if (range.toString() !== highlight.text) {
    return null;
  }

  return range;
}
