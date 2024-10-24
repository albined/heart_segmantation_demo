import * as niivue from "https://niivue.github.io/niivue/dist/index.js";

// Define the volumes to load (scan and segmentation)
const volumeList = [
  { 
    url: "./image_030.nii.gz",
    colorMap: "gray",
    opacity: 0.8
  },
  { 
    url: "./label_030.nii.gz",  // "Truth"
    colorMap: "green",
    opacity: 0.5
  },
  { 
    url: "./pred_unet_030.nii.gz",  // "UNET"
    colorMap: "red",
    opacity: 0.5
  },
  { 
    url: "./pred_unetr_030.nii.gz",  // "UNETR"
    colorMap: "blue",
    opacity: 0
  },
  { 
    url: "./pred_swinunetr_030.nii.gz",  // "Swin UNETR"
    colorMap: "Jet",
    opacity: 0
  }
];

// Initialize Niivue
const nv = new niivue.Niivue({ isResizeCanvas: true });
nv.attachTo('gl');

// Load volumes
nv.loadVolumes(volumeList).then(() => {
  console.log('Volumes loaded successfully');
}).catch((error) => {
  console.error('Error loading volumes:', error);
});

// Get checkbox elements
const truthCheckbox = document.getElementById('truth-checkbox');
const unetCheckbox = document.getElementById('unet-checkbox');
const unetrCheckbox = document.getElementById('unetr-checkbox');
const swinUnetrCheckbox = document.getElementById('swin-unetr-checkbox');

// Function to toggle volume visibility based on checkbox
function toggleVolumeVisibility(checkbox, volumeIndex) {
  checkbox.addEventListener('change', () => {
    const newOpacity = checkbox.checked ? 0.5 : 0; // Set to 0.5 if checked, else 0
    nv.setOpacity(volumeIndex, newOpacity); // Update the opacity
  });
}

// Attach event listeners to checkboxes
toggleVolumeVisibility(truthCheckbox, 1); // Truth volume
toggleVolumeVisibility(unetCheckbox, 2);  // UNET volume
toggleVolumeVisibility(unetrCheckbox, 3); // UNETR volume
toggleVolumeVisibility(swinUnetrCheckbox, 4); // Swin UNETR volume
