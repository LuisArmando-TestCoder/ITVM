const changeOpacityOnScroll = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => {

    if (ProximityToTargetBody ** 15 === 1) {
        target.style.opacity = "1";
        target.classList.add("show");

        return;
    }

    target.style.opacity = "0";
    target.classList.remove("show");
};

const changeClipPathOnScroll = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => {

    if (ProximityToTargetBody ** 15 === 1) {
        target.style.clipPath = "inset(0 0 0 0)";

        return;
    }

    target.style.clipPath = "inset(0 0 100% 0)";
};

const changePositionOnScroll = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => {
  target.style.position = "relative";
  const direction =
    (([...(target.parentElement?.children || [])].indexOf(target) % 2) - 0.5) *
    2;
  target.style.left = `${
    (1 - ProximityToTargetBody) ** 2 * 1090 * direction
  }px`;
};

const changeSkewOnScroll = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => {
  const direction =
    (([...(target.parentElement?.children || [])].indexOf(target) % 2) - 0.5) *
    2;
  target.style.transform = `skew(${
    (1 - ProximityToTargetBody) ** 2 * 2000 * direction
  }deg)`;
};

const changeHeightOnScroll = (
  target: HTMLElement,
  ProximityToTargetBody: number
) => {
  target.style.height = `${ProximityToTargetBody ** 4 * 700}px`;
};

const effects = {
  changeHeightOnScroll,
  changeOpacityOnScroll,
  changePositionOnScroll,
  changeSkewOnScroll,
  changeClipPathOnScroll,
} as const

export default effects

export type Effects = keyof typeof effects;