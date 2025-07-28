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
      const businessType = document.getElementById("businessType").value;
      const adPlatform = document.getElementById("adPlatform").value;

      const multipliers = {
        "Ecommerce": {
          "Meta Ads": 1.345,
          "Google Ads": 1.345,
          "Youtube Ads": 1.31,
          "TikTok Ads": 1.31
        },
        "SaaS": {
          "Meta Ads": 1.28,
          "Google Ads": 1.28,
          "Youtube Ads": 1.25,
          "TikTok Ads": 1.25
        },
        "Info Education": {
          "Meta Ads": 1.40,
          "Google Ads": 1.40,
          "Youtube Ads": 1.35,
          "TikTok Ads": 1.35
        },
        "Call Funnels": {
          "Meta Ads": 1.45,
          "Google Ads": 1.45,
          "Youtube Ads": 1.40,
          "TikTok Ads": 1.40
        }
      };

      if (!spend || isNaN(spend)) return;

      const currentRoas = (revenue / spend).toFixed(1);
      const currentRoi = ((revenue - spend) / spend * 100).toFixed(0);
      console.log(currentRoi);

      const multiplier = multipliers[businessType][adPlatform];
      const newRoasValue = (revenue / spend) * multiplier;
      const newRevenueValue = spend * newRoasValue;
      const newRoas = newRoasValue.toFixed(1);
      const newRoi = ((newRoasValue - 1) * 100).toFixed(0);
      const profitDifference = newRevenueValue - revenue;

      revenueDisplay.innerText = formatUSD(revenue) + " /month";
      currentRevenue.innerText = formatUSD(revenue);
      currentROAS.innerText = `${currentRoas}x`;
      currentROI.innerText = `${currentRoi}%`;

      newRevenue.innerText = formatUSD(newRevenueValue);
      newROAS.innerText = `${newRoas}x`;
      newROI.innerText = `${newRoi}%`;

      netProfit.innerText = `+${formatUSD(profitDifference)} /mo`;

      removeBlur();
    }

    spendInput.addEventListener("input", calculate);
    revenueSlider.addEventListener("input", calculate);

    calculate(); // Initial run

    