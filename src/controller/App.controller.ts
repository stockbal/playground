import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import AppComponent from "../Component";

/**
 * @namespace com.devepos.apps.playground.controller
 */
export default class AppController extends Controller {
    public onInit(): void {
        // apply content density mode to root view
        this.getView().addStyleClass(
            (this.getOwnerComponent() as AppComponent).getContentDensityClass()
        );
    }

    public sayHello(): void {
        MessageToast.show("Hello World!");
    }
}
