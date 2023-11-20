// @ts-nocheck
import { AfterViewInit, Component, Input } from "@angular/core";
import schema from "./calendar-heatmap.schema.json";
import embed from "vega-embed";

interface CalendarData {
  date: string;
  count: number;
}

@Component({
  selector: "app-calendar-heatmap",
  template: ` <div id="calendar-element"></div> `,
  styleUrls: ["./calendar-heatmap.component.less"],
})
export class CalendarHeatmapComponent implements AfterViewInit {
  public constructor() {}

  @Input() public data: string[] = [];
  private spec: any = schema;
  private chart: any;

  public async ngAfterViewInit() {
    this.spec = this.addDataToSpec(this.data, this.spec);

    this.chart = await embed("#calendar-element", this.spec);
    
    console.debug(this.chart);
  }

  private addDataToSpec(data: string[], spec: any): any {
    const newSpec = spec;
    newSpec.data.values = this.formatData(data);
    return newSpec;
  }

  private formatData(data: string[]): CalendarData[] {
    return data.map((date: string): CalendarData => {
      return {
        date,
        count: 1,
      };
    });
  }
}
