import { SpellBase, SpellResult, DefaultDisplayType } from "zeppelin-spell";
import cytoscape from "cytoscape";
import euler from "cytoscape-euler";

export default class Que extends SpellBase {
  constructor() {
    super("%que");
  }

  interpret(input) {
    const callback = (elementId => {
      const container = document.getElementById(elementId);
      container.style.width = "100%";
      container.style.height = "590px";
      try {
        const data = JSON.parse(input);
        cytoscape.use(euler);
        const cy = cytoscape({
          container, // container to render in
          elements: data.elements,
          style: data.style,
          layout: {
            name: "grid",
            fit: true, // whether to fit the viewport to the graph
            padding: 30, // padding used on fit
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            avoidOverlapPadding: 3, // extra spacing around nodes when avoidOverlap: true
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
          },
        });
      } catch (error) {
        console.error(`Failed to parse JSON`, error)
      }
    });


    return new SpellResult(callback);
  }
}
