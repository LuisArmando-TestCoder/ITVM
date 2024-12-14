export type ProximityCallback = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => void;
export type ScrollingEffectsMap = Map<HTMLElement, ProximityCallback[]>;

export function setScrollingEffects(
  scrollingEffectsAffectedElements: HTMLElement[],
  proximityCallbacks: ProximityCallback[],
  scrollElement: HTMLElement,
): void {
  const scrollingEffectsMap: ScrollingEffectsMap = new Map();
  scrollingEffectsAffectedElements.forEach((element) => {
    console.log("element", element)
    scrollingEffectsMap.set(element, proximityCallbacks);
  });
  const trigger = () => {
    triggerScrollingEffect(scrollingEffectsMap, proximityCallbacks);
  };

  trigger();

  scrollElement.addEventListener("scroll", trigger, { passive: true });
  //   window.addEventListener('resize', trigger, { passive: true });
}

function triggerScrollingEffect(
  scrollingEffectsMap: ScrollingEffectsMap,
  proximityCallbacks: ProximityCallback[]
) {
  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;

  for (const [element, proximityCallbacks] of scrollingEffectsMap.entries()) {
    const { top, height } = element.getBoundingClientRect();

    const bottom = top + height;
    const viewportCenter = viewportHeight / 2;
    const scrollCenterPosition = scrollY + viewportCenter; // y
    const elementTopAbsolutePosition = top + scrollY; // t
    const elementBottomAbsolutePosition = bottom + scrollY; // b

    const bodyProximityToCenter =
      Math.min(scrollCenterPosition, elementTopAbsolutePosition) /
      elementTopAbsolutePosition /
      (Math.max(scrollCenterPosition, elementBottomAbsolutePosition) /
        elementBottomAbsolutePosition);

    // console.table([["bodyProximityToCenter", bodyProximityToCenter]]);

    proximityCallbacks.forEach((proximityCallback) => {
      proximityCallback(element, bodyProximityToCenter);
    });

    if (bodyProximityToCenter ** 15 === 1) {
      element.classList.add("show");

      continue;
    }

    element.classList.remove("show");
  }
}
