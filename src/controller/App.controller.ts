import MessageToast from "sap/m/MessageToast";

import BaseController from "./BaseController";

/**
 * @namespace com.devepos.apps.playground.controller
 */
export default class AppController extends BaseController {
    public onInit(): void {
        super.onInit();
    }

    sayHello(): void {
        MessageToast.show(this.getResourceBundle().getText("message"));
    }
}
