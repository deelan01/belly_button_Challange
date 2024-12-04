// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let data_ = data.metadata;
    console.log(data_);
    // Filter the metadata for the object with the desired sample number
    let metadata = data_.filter(sample_obj => sample_obj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let sel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      sel.append("h6").text(`${key}: ${value}`);
    });
  });
}


// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let sample_data = data.samples;

    // Filter the samples for the object with the desired sample number
    let sample_sel = sample_data.filter(smp_obj => smp_obj.id == sample)[0];
    console.log(sample_sel);
    // Get the otu_ids, otu_labels, and sample_values
    let otu_id = sample_sel.otu_ids;
    let otu_lab = sample_sel.otu_labels;
    let sample_val = sample_sel.sample_values;
    
    let otu_id_10 = otu_id.slice(0, 10).reverse();
    let otu_lab_10 = otu_lab.slice(0, 10).reverse();
    let sample_val_10 = sample_val.slice(0, 10).reverse();
    console.log(otu_id_10)
    console.log(otu_lab_10)
    console.log(sample_val_10)
    // Build a Bubble Chart
    let btrace = {
      x: otu_id_10,
      y: sample_val_10,
      hovertext: otu_lab_10,
      mode: 'markers',
      marker: {
        size: sample_val_10,
        color: otu_id_10,
        text: otu_lab_10,
        colorscale: 'Earth',
        showscale: true 
      }
    };
    let lay = {
      title: 'Bacteria Cultures per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      showlegend: false
    };
    // Render the Bubble Chart
    Plotly.newPlot('bubble', [btrace], lay);
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let trace = {
      x: sample_val_10,
      y: otu_lab_10,
      type: 'bar',
      orientation: 'h',
      hovertext: otu_lab_10,
      sort: false
    };

    // Build a Bar Chart
    let layout = {
      title: 'Top 10 Bacteria Cultures',
      xaxis: { title: 'Number of Bacteria' },
      yaxis: {title: otu_lab_10},
      height: 1000,
      width: 800
    };

    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart
    Plotly.newPlot("bar", [trace], layout);
  });
}
// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let name = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    name.forEach(sample => {
    dropdown.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let first = name[0]

    // Build charts and metadata panel with the first sample
    buildCharts(first);
    buildMetadata(first);
  });
}

// Function for event listener
function optionChanged(sample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(sample);
  buildMetadata(sample);
}

// Initialize the dashboard
init();
