/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
const TextEditorClass = foundry.applications?.ux?.TextEditor ?? globalThis.TextEditor;

export class ElectricBastionlandItemSheet extends ItemSheet {


    /** @override */
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["electricbastionland", "sheet", "item"],
            width: 500,
            height: 440
        });
    }

    /** @override */
    get template() {
        const path = "systems/electricbastionland/templates/item";
        return `${path}/item-sheet.html`;
    }

    /* -------------------------------------------- */

    async getData() {
        const context = await super.getData();
        context.system = context.item.system;
        context.enrichedDescription = await TextEditor.enrichHTML(context.system.description, { async: true });
        return context;
    }

    /* -------------------------------------------- */

    /** @override */
    setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /* -------------------------------------------- */

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Everything below here is only needed if the sheet is editable
        if (!this.options.editable) return;

        // Roll handlers, click handlers, etc. would go here.
    }
}
