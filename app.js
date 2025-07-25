const spendInput = document.getElementById("monthlySpend");
const revenueSlider = document.getElementById("monthlyRevenue");
const revenueDisplay = document.getElementById("revenueDisplay");

const currentRevenue = document.getElementById("currentRevenue");
const currentROAS = document.getElementById("currentROAS");
const currentROI = document.getElementById("currentROI");

const newRevenue = document.getElementById("newRevenue");
const newROAS = document.getElementById("newROAS");
const newROI = document.getElementById("newROI");

const netProfit = document.getElementById("netProfit");

function formatUSD(value) {
  return `$${Number(value).toLocaleString()}`;
}

function removeBlur() {
  document.querySelectorAll(".blur").forEach(el => {
    el.classList.remove("blur");
  });
}

function calculate() {
  const spend = parseFloat(spendInput.value);
  const revenue = parseFloat(revenueSlider.value);

  const currentRoas = (revenue / spend).toFixed(1);
  const currentRoi = ((revenue - spend) / spend * 100).toFixed(0);

  const boostFactor = 1.31;
  const boostedRevenue = (revenue * boostFactor).toFixed(0);
  const newRoas = (boostedRevenue / spend).toFixed(1);
  const newRoi = ((boostedRevenue - spend) / spend * 100).toFixed(0);

  const profitDifference = boostedRevenue - revenue;

  revenueDisplay.innerText = formatUSD(revenue) + " /month";
  currentRevenue.innerText = formatUSD(revenue);
  currentROAS.innerText = `${currentRoas}x`;
  currentROI.innerText = `${currentRoi}%`;

  newRevenue.innerText = formatUSD(boostedRevenue);
  newROAS.innerText = `${newRoas}x`;
  newROI.innerText = `${newRoi}%`;

  netProfit.innerText = `+${formatUSD(profitDifference)} /mo`;

  removeBlur(); // Unblur values on interaction
}

spendInput.addEventListener("input", calculate);
revenueSlider.addEventListener("input", calculate);

// On first load – values stay blurred until slider used
calculate();
