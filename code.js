var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { selection } = figma.currentPage;
const localTextStyles = figma.getLocalTextStyles();
const localPaintStyles = figma.getLocalPaintStyles();
const localEffectStyles = figma.getLocalEffectStyles();
selection.length === 0 && figma.closePlugin("Nothing selected 😮");
selection.forEach((textNode) => __awaiter(this, void 0, void 0, function* () {
    if (textNode.type === "TEXT") {
        yield figma.loadFontAsync(textNode.fontName);
        const localTextStyle = localTextStyles.find(({ name: localName }) => localName === textNode.name);
        const makeTextStyle = localTextStyle || figma.createTextStyle();
        let textStyle = textNode.fontName;
        if (textNode.fontName !== figma.mixed) {
            makeTextStyle.fontName = {
                family: textStyle.family,
                style: textStyle.style,
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
            textNode.textDecoration !== figma.mixed ? textNode.textDecoration : null;
        makeTextStyle.description = textNode.characters;
        makeTextStyle.fontSize =
            textNode.fontSize !== figma.mixed ? textNode.fontSize : null;
        Promise.resolve("Done");
        return;
    }
}));
selection.forEach((shapeNode) => __awaiter(this, void 0, void 0, function* () {
    if (shapeNode.type === "FRAME" ||
        shapeNode.type === "RECTANGLE" ||
        shapeNode.type === "ELLIPSE" ||
        shapeNode.type === "STAR" ||
        shapeNode.type === "POLYGON" ||
        shapeNode.type === "VECTOR" ||
        shapeNode.type === "COMPONENT" ||
        shapeNode.type === "INSTANCE") {
        const localPaintStyle = localPaintStyles.find(({ name: localName }) => localName === shapeNode.name);
        const makeColourStyle = localPaintStyle || figma.createPaintStyle();
        if (shapeNode.fills !== figma.mixed) {
            makeColourStyle.paints = shapeNode.fills;
        }
        makeColourStyle.name = shapeNode.name;
        makeColourStyle.description = shapeNode.name;
        Promise.resolve("Done");
        return;
    }
}));
selection.forEach((effectNode) => __awaiter(this, void 0, void 0, function* () {
    if (effectNode.type === "FRAME" ||
        effectNode.type === "RECTANGLE" ||
        effectNode.type === "ELLIPSE" ||
        effectNode.type === "STAR" ||
        effectNode.type === "POLYGON" ||
        effectNode.type === "VECTOR" ||
        effectNode.type === "COMPONENT" ||
        effectNode.type === "INSTANCE") {
        const localEffectStyle = localEffectStyles.find(({ name: localName }) => localName === effectNode.name + " " + "Effect");
        if (effectNode.effects.length > 0) {
            const makeEffectStyle = localEffectStyle || figma.createEffectStyle();
            makeEffectStyle.name = effectNode.name + " " + "Effect";
            makeEffectStyle.effects = effectNode.effects;
        }
        Promise.resolve("Done");
        return;
    }
}));
figma.closePlugin("Finished  ✔");
