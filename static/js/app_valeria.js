function buildMetadata(name) {
  d3.json(`/cat/metadata/${name}`).then(function(name){
    var metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html("");
    Object.entries(name).forEach(([key, value])=>{
      var row = metadataDiv.append("p");
      row.text(`${key}: ${value}`);

  })
})
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
