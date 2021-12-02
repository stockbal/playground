import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UIComponent from "sap/ui/core/UIComponent";
import { support } from "sap/ui/Device";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

import { setResourceBundle } from "./helper/i18nUtil";
import models from "./model/models";

const COZY_DENSITY = "sapUiSizeCozy";
const COMPACT_DENSITY = "sapUiSizeCompact";

/**
 * @namespace com.devepos.apps.playground
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    private _bundle: ResourceBundle;
    private _contentDensityClass: string;

    public init(): void {
        // call the base component's init function
        super.init();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // create the views based on the url/hash
        // this.getRouter().initialize(); // TODO: needed for routing

        // globally register the resource bundle of the application
        setResourceBundle(this.getResourceBundle());
    }

    /**
     * Returns the i18n bundle
     * @returns the i18n resource bundle
     */
    getResourceBundle(): ResourceBundle {
        if (!this._bundle) {
            this._bundle = (
                this.getModel("i18n") as ResourceModel
            )?.getResourceBundle() as ResourceBundle;
        }
        return this._bundle;
    }

    /**
     * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
     * design mode class should be set, which influences the size appearance of some controls.
     *
     * @public
     * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
     */
    public getContentDensityClass(): string {
        if (this._contentDensityClass === undefined) {
            // check whether FLP has already set the content density class; do nothing in this case
            if (
                document.body.classList.contains(COZY_DENSITY) ||
                document.body.classList.contains(COMPACT_DENSITY)
            ) {
                this._contentDensityClass = "";
            } else if (!support.touch) {
                // apply "compact" mode if touch is not supported
                this._contentDensityClass = COMPACT_DENSITY;
            } else {
                // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                this._contentDensityClass = COZY_DENSITY;
            }
        }
        return this._contentDensityClass;
    }
}
