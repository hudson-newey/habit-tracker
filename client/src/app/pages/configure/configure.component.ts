import { Component } from "@angular/core";
import { ClientConfigService } from "src/app/services/clientConfig/client-config.service";

@Component({
  selector: "app-configure",
  templateUrl: "./configure.component.html",
  styleUrls: ["./configure.component.less"],
})
export class ConfigurePageComponent {
  public constructor(private configService: ClientConfigService) {}

  protected customServerUrl: string =
    this.configService.getCustomServerUrl() ?? "";
  protected formFeedback: string = "";

  protected saveCustomServerUrl(): void {
    if (this.customServerUrl) {
      this.configService.setCustomServerUrl(this.customServerUrl);
      this.formFeedback = "Custom server URL saved!";
    } else {
      this.formFeedback = "Please enter a valid server URL.";
    }
  }

  protected clearCustomServerUrl(): void {
    this.customServerUrl = "";

    this.configService.clearCustomServerUrl();

    this.formFeedback = "Custom server URL cleared!";
  }
}
