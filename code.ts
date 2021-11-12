// figma.showUI(__html__, { width: 300, height: 105 });

const { selection } = figma.currentPage;
const localTextStyles = figma.getLocalTextStyles();
const localPaintStyles = figma.getLocalPaintStyles();
const localEffectStyles = figma.getLocalEffectStyles();

selection.length === 0 && figma.closePlugin("Nothing selected 😮");

// const setStyles = async () => {
//   figma.currentPage
//     .findAll((node) => node.type === "TEXT")
//     .forEach(async (textNode: any): Promise<string> => {
//       await figma.loadFontAsync(textNode.fontName as FontName);
//       const localTextStyle = localTextStyles.find(
//         ({ name: localName }) => localName === textNode.name
//       );
//       textNode.textStyleId = localTextStyle.id;
//       Promise.resolve("Done");
//       return;
//     });
//   figma.currentPage
//     .findAll(
//       (node) =>
//         node.type === "FRAME" ||
//         node.type === "RECTANGLE" ||
//         node.type === "ELLIPSE" ||
//         node.type === "STAR" ||
//         node.type === "POLYGON" ||
//         node.type === "VECTOR" ||
//         node.type === "COMPONENT" ||
//         node.type === "INSTANCE"
//     )
//     .forEach(async (shapeNode: any): Promise<string> => {
//       const localPaintStyle = localPaintStyles.find(
//         ({ name: localName }) => localName === shapeNode.name
//       );
//       shapeNode.fillStyleId = localPaintStyle.id;
//       Promise.resolve("Done");
//       return;
//     });
//   figma.currentPage
//     .findAll(
//       (node) =>
//         node.type === "FRAME" ||
//         node.type === "RECTANGLE" ||
//         node.type === "ELLIPSE" ||
//         node.type === "STAR" ||
//         node.type === "POLYGON" ||
//         node.type === "VECTOR" ||
//         node.type === "COMPONENT" ||
//         node.type === "INSTANCE"
//     )
//     .forEach(async (effectNode: any): Promise<string> => {
//       const localEffectStyle = localEffectStyles.find(
//         ({ name: localName }) => localName === effectNode.name + " " + "Effect"
//       );
//       if (effectNode.effects.length > 0) {
//         effectNode.effectStyleId = localEffectStyle.id;
//         Promise.resolve("Done");
//         return;
//       }
//     });
//   figma.notify("Styles set  ✔");
// };

// figma.ui.onmessage = (msg) => {
// if (figma.command === "create-styles") {
// if (msg.type === "create-styles") {
const createStyles = async () => {
  selection.forEach(async (textNode): Promise<string> => {
    if (
      textNode.name.startsWith("Frame") ||
      textNode.name.startsWith("Artboard")
    ) {
      Promise.reject("Rename first");
      figma.closePlugin(
        "Press CMD(CTRL)+R and rename your layers to include / separators"
      );
    } else if (textNode.type === "TEXT") {
      await figma.loadFontAsync(textNode.fontName as FontName);
      const localTextStyle = localTextStyles.find(
        ({ name: localName }) => localName === textNode.name
      );
      const makeTextStyle = localTextStyle || figma.createTextStyle();
      let textStyle = textNode.fontName;
      if (textNode.fontName !== figma.mixed) {
        makeTextStyle.fontName = {
          family: (textStyle as FontName).family,
          style: (textStyle as FontName).style,
        };
      }
      makeTextStyle.name = textNode.name;
      makeTextStyle.lineHeight =
        textNode.lineHeight !== figma.mixed ? textNode.lineHeight : null;
      makeTextStyle.letterSpacing =
        textNode.letterSpacing !== figma.mixed ? textNode.letterSpacing : null;
      makeTextStyle.paragraphIndent = textNode.paragraphIndent;
      makeTextStyle.paragraphSpacing = textNode.paragraphSpacing;
      makeTextStyle.textCase =
        textNode.textCase !== figma.mixed ? textNode.textCase : null;
      makeTextStyle.textDecoration =
        textNode.textDecoration !== figma.mixed
          ? textNode.textDecoration
          : null;
      makeTextStyle.description = textNode.characters;
      makeTextStyle.fontSize =
        textNode.fontSize !== figma.mixed ? textNode.fontSize : null;
      Promise.resolve("Done");
      return;
    }
  });

  selection.forEach(async (shapeNode): Promise<string> => {
    if (
      shapeNode.name.startsWith("Frame") ||
      shapeNode.name.startsWith("Artboard") ||
      shapeNode.name.startsWith("Rectangle") ||
      shapeNode.name.startsWith("Ellipse") ||
      shapeNode.name.startsWith("Star") ||
      shapeNode.name.startsWith("Polygon") ||
      shapeNode.name.startsWith("Vector") ||
      shapeNode.name.startsWith("Component") ||
      shapeNode.name.startsWith("Instance")
    ) {
      figma.closePlugin(
        "Press CMD(CTRL)+R and rename your layers to include / separators"
      );
      Promise.reject("Rename first");
    } else if (
      shapeNode.type === "FRAME" ||
      shapeNode.type === "RECTANGLE" ||
      shapeNode.type === "ELLIPSE" ||
      shapeNode.type === "STAR" ||
      shapeNode.type === "POLYGON" ||
      shapeNode.type === "VECTOR" ||
      shapeNode.type === "COMPONENT" ||
      shapeNode.type === "INSTANCE"
    ) {
      const localPaintStyle = localPaintStyles.find(
        ({ name: localName }) => localName === shapeNode.name
      );
      const makeColourStyle = localPaintStyle || figma.createPaintStyle();
      if (shapeNode.fills !== figma.mixed) {
        makeColourStyle.paints = shapeNode.fills;
      }
      makeColourStyle.name = shapeNode.name;
      Promise.resolve("Done");
      return;
    }
  });

  selection.forEach(async (effectNode): Promise<string> => {
    if (
      effectNode.name.startsWith("Frame") ||
      effectNode.name.startsWith("Artboard")
    ) {
      figma.closePlugin(
        "Press CMD(CTRL)+R and rename your Text layers to include / separators"
      );
      Promise.reject("Rename first");
    } else if (
      effectNode.type === "FRAME" ||
      effectNode.type === "RECTANGLE" ||
      effectNode.type === "ELLIPSE" ||
      effectNode.type === "STAR" ||
      effectNode.type === "POLYGON" ||
      effectNode.type === "VECTOR" ||
      effectNode.type === "COMPONENT" ||
      effectNode.type === "INSTANCE"
    ) {
      const localEffectStyle = localEffectStyles.find(
        ({ name: localName }) => localName === effectNode.name + " " + "Effect"
      );
      if (effectNode.effects.length > 0) {
        const makeEffectStyle = localEffectStyle || figma.createEffectStyle();
        makeEffectStyle.name = effectNode.name + " " + "Effect";
        makeEffectStyle.effects = effectNode.effects;
      }
      Promise.resolve("Done");
      return;
    }
  });
};
createStyles().then(() => {
  figma.closePlugin("Styles created");
});

const colorStyles = figma.getLocalPaintStyles();

const updatedColorStyles = colorStyles.filter((style) => {
  const { paints } = style;
  if (paints.length !== 1) {
    // Skip styles containing multiple colors.
    return false;
  }
  const [paint] = paints;
  if (paint.type !== "SOLID") {
    // Skip styles containing gradients, image fills, etc.
    return false;
  }
  const hexColor = rgbToHex(paint.color);
  if (style.description === hexColor) {
    // Skip styles that already have the correct description.
    return false;
  }
  // Set the style description equal to the color's hex code.
  style.description = hexColor;
  return true;
});

// Show a toast indicating the number of style descriptions that were updated.
figma.notify(`✅ Updated ${updatedColorStyles.length} style description(s)`);

/**
 * Converts an RGB object to a hex color string. For example:
 * { r: 0.5, g: 0.5, b: 0.5 } => '#808080'
 */
function rgbToHex(rgb: RGB) {
  const r = ratioToHex(rgb.r);
  const g = ratioToHex(rgb.g);
  const b = ratioToHex(rgb.b);
  return `#${r}${g}${b}`;
}

/**
 * Converts a ratio between [0,1] to a 2-character hex string. For example:
 * 0.5 => '80'
 */
function ratioToHex(ratio: number) {
  const hex = Math.round(ratio * 255)
    .toString(16)
    .toUpperCase();
  return `${hex.length === 1 ? "0" : ""}${hex}`;
}
// }

// if (figma.command === "set-styles") {
// if (msg.type === "set-styles") {
//   figma.currentPage
//     .findAll((node) => node.type === "TEXT")
//     .forEach(async (textNode: any): Promise<string> => {
//       await figma.loadFontAsync(textNode.fontName as FontName);
//       const localTextStyle = localTextStyles.find(
//         ({ name: localName }) => localName === textNode.name
//       );
//       textNode.textStyleId = localTextStyle.id;
//       Promise.resolve("Done");
//       return;
//     });
//   figma.currentPage
//     .findAll(
//       (node) =>
//         node.type === "FRAME" ||
//         node.type === "RECTANGLE" ||
//         node.type === "ELLIPSE" ||
//         node.type === "STAR" ||
//         node.type === "POLYGON" ||
//         node.type === "VECTOR" ||
//         node.type === "COMPONENT" ||
//         node.type === "INSTANCE"
//     )
//     .forEach(async (shapeNode: any): Promise<string> => {
//       const localPaintStyle = localPaintStyles.find(
//         ({ name: localName }) => localName === shapeNode.name
//       );
//       shapeNode.fillStyleId = localPaintStyle.id;
//       Promise.resolve("Done");
//       return;
//     });
//   figma.currentPage
//     .findAll(
//       (node) =>
//         node.type === "FRAME" ||
//         node.type === "RECTANGLE" ||
//         node.type === "ELLIPSE" ||
//         node.type === "STAR" ||
//         node.type === "POLYGON" ||
//         node.type === "VECTOR" ||
//         node.type === "COMPONENT" ||
//         node.type === "INSTANCE"
//     )
//     .forEach(async (effectNode: any): Promise<string> => {
//       const localEffectStyle = localEffectStyles.find(
//         ({ name: localName }) =>
//           localName === effectNode.name + " " + "Effect"
//       );
//       if (effectNode.effects.length > 0) {
//         effectNode.effectStyleId = localEffectStyle.id;
//         Promise.resolve("Done");
//         return;
//       }
//     });
//   figma.notify("Styles set  ✔");
// }

// if (msg.checkboxOn === true) {
//   figma.closePlugin();
// }
// };
