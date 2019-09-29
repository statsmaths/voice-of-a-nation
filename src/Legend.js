import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.id = this.props.id;

      var names = null;
      var colors = null;

      if (this.props.color === "gender")
      {
        names = ["Female", "Male", "Unknown"];
        colors = ["blue", "red", "black"]
      }
      if (this.props.color === "race")
      {
        names = ["Black", "White", "Unknown"];
        colors = ["green", "pink", "black"]
      }

      let labels = [];

      for (let i = 0; i < names.length; i++) {
        labels.push(
          '<i style="background:' +
            colors[i] +
            '"></i> ' +
            names[i]
        );
      }

      div.innerHTML = labels.join("<br>");
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);
