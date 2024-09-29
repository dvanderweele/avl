
import {
  AVL
} from "./avl.js";
import {
  writeFile
} from "fs/promises";
import {
  shuffleArray,
  percentile,
  standardDeviation
} from "../utils.js";

function benchBabyBench() {
  const uniqueIntegers = Array.from({ length: 5000 }, (_, index) => index);

  // Unsorting the uniqueIntegers array
  shuffleArray(uniqueIntegers);

  const avl1kOdds = new AVL();
  for (let i = 1; i < 2000; i = i + 2) {
    avl1kOdds.insert(uniqueIntegers[i]);
  }
  const avl2p5kOdds = new AVL();
  for (let i = 1; i < uniqueIntegers.length; i = i + 2) {
    avl2p5kOdds.insert(uniqueIntegers[i]);
  }

  console.log("n-------------------n");
  console.log("| JS AVL TREE BENCH |");
  console.log("u-------------------u\n");

  console.log("| n = 1k |");

  const n1kInsertDurations = [];
  const n1kRemoveDurations = [];

  for (let i = 0; i < uniqueIntegers.length; i = i + 2) {
    performance.mark("is");
    avl1kOdds.insert(uniqueIntegers[i]);
    performance.mark("ie");
    performance.mark("rs");
    avl1kOdds.remove(uniqueIntegers[i]);
    performance.mark("re");
    const ins = performance.measure("insertDuration", "is", "ie");
    n1kInsertDurations.push(ins.duration);
    const rem = performance.measure("removeDuration", "rs", "re");
    n1kRemoveDurations.push(rem.duration);
  }
  
  //console.log(...avl1kOdds)

  console.log("| n = 2.5k |");

  const n2p5kInsertDurations = [];
  const n2p5kRemoveDurations = [];

  for (let i = 0; i < uniqueIntegers.length; i = i + 2) {
    performance.mark("is");
    avl2p5kOdds.insert(uniqueIntegers[i]);
    performance.mark("ie");
    performance.mark("rs");
    avl2p5kOdds.remove(uniqueIntegers[i]);
    performance.mark("re");
    const ins = performance.measure("insertDuration", "is", "ie");
    n2p5kInsertDurations.push(ins.duration);
    const rem = performance.measure("removeDuration", "rs", "re");
    n2p5kRemoveDurations.push(rem.duration);
  }

  return [
    {
      arr: n1kInsertDurations.sort(),
      label: "n1kInsertDurations"
    },
    {
      arr: n1kRemoveDurations.sort(),
      label: "n1kRemoveDurations"
    },
    {
      arr: n2p5kInsertDurations.sort(),
      label: "n2p5kInsertDurations"
    },
    {
      arr: n2p5kRemoveDurations.sort(),
      label: "n2p5kRemoveDurations"
    }
  ].map(({arr, label}) => {
    const raw = {
      count: 2500,
      sum: arr.reduce((a, b) => a + b),
      min: arr[0],
      p01: percentile(arr, 0.01, label, true),
      p05: percentile(arr, 0.05),
      p10: percentile(arr, 0.1),
      p25: percentile(arr, 0.25),
      p50: percentile(arr, 0.5),
      p75: percentile(arr, 0.75),
      p90: percentile(arr, 0.9),
      p95: percentile(arr, 0.95),
      p99: percentile(arr, 0.99),
      max: arr[arr.length - 1],
    };
    raw.average = raw.sum / raw.count;
    raw.standardDeviation = standardDeviation(arr, raw.average);
    raw.coefficientOfVariation = raw.standardDeviation / raw.average;
    raw.IQR = raw.p75 - raw.p25;
    const outlierK = 1.5;
    const farOutK = 3;
    const lowerOutlierFence = Math.max(raw.p25 - outlierK * raw.IQR, 0);
    const upperOutlierFence = raw.p75 + outlierK * raw.IQR;
    const lowerFarOutFence = Math.max(raw.p25 - farOutK * raw.IQR, 0);
    const upperFarOutFence = raw.p75 + farOutK * raw.IQR;
    raw.lowOutliers = arr.filter((a) => a < lowerOutlierFence);
    raw.highOutliers = arr.filter((a) => a > upperOutlierFence);
    raw.lowFarOutliers = arr.filter((a) => a < lowerFarOutFence);
    raw.highFarOutliers = arr.filter((a) => a > upperFarOutFence);
    const aorm = arr.filter(
      (a) => a >= lowerOutlierFence && a <= upperOutlierFence,
    );
    const allOutliersRemoved = {
      count: aorm.length,
      sum: aorm.reduce((a, b) => a + b, 0),
      min: aorm[0],
      p01: percentile(aorm, 0.01),
      p05: percentile(aorm, 0.05),
      p10: percentile(aorm, 0.1),
      p25: percentile(aorm, 0.25),
      p50: percentile(aorm, 0.5),
      p75: percentile(aorm, 0.75),
      p90: percentile(aorm, 0.9),
      p95: percentile(aorm, 0.95),
      p99: percentile(aorm, 0.99),
      max: aorm[aorm.length - 1],
    };
    allOutliersRemoved.average =
      allOutliersRemoved.sum / allOutliersRemoved.count;
    allOutliersRemoved.standardDeviation = standardDeviation(
      aorm,
      allOutliersRemoved.average,
    );
    allOutliersRemoved.coefficientOfVariation =
      allOutliersRemoved.standardDeviation / allOutliersRemoved.average;
    allOutliersRemoved.IQR = allOutliersRemoved.p75 - allOutliersRemoved.p25;
    const aorc = arr.map((a) =>
      a < lowerFarOutFence
        ? lowerFarOutFence
        : a > upperOutlierFence
          ? upperOutlierFence
          : a,
    );
    const allOutlersRecoded = {
      count: aorc.length,
      sum: aorc.reduce((a, b) => a + b, 0),
      min: aorc[0],
      p01: percentile(aorc, 0.01),
      p05: percentile(aorc, 0.05),
      p10: percentile(aorc, 0.1),
      p25: percentile(aorc, 0.25),
      p50: percentile(aorc, 0.5),
      p75: percentile(aorc, 0.75),
      p90: percentile(aorc, 0.9),
      p95: percentile(aorc, 0.95),
      p99: percentile(aorc, 0.99),
      max: aorc[aorc.length - 1],
    };
    allOutlersRecoded.average = allOutlersRecoded.sum / allOutlersRecoded.count;
    allOutlersRecoded.standardDeviation = standardDeviation(
      aorc,
      allOutlersRecoded.average,
    );
    allOutlersRecoded.coefficientOfVariation =
      allOutlersRecoded.standardDeviation / allOutlersRecoded.average;
    allOutlersRecoded.IQR = allOutlersRecoded.p75 - allOutlersRecoded.p25;
    return { 
      label,
      raw,
      allOutliersRemoved,
      allOutlersRecoded,
    };
  });
}

const records = [[
  "label", 
  "type",
  "count",
  "sum",
  "min",
  "p01",
  "p05",
  "p10",
  "p25",
  "p50",
  "p75",
  "p90",
  "p95",
  "p99",
  "max",
  "average",
  "standardDeviation",
  "coefficientOfVariation",
  "IQR",
  "lowOutliersJSON",
  "highOutliersJSON",
  "lowFarOutliersJSON",
  "highFarOutliersJSON"
]];
for (let i = 0; i < 100; i++) {
  const result = benchBabyBench();
  result.forEach(
    result => {
      records.push([
        result.label,
        "raw",
        result.raw.count,
        result.raw.sum,
        result.raw.min,
        result.raw.p01,
        result.raw.p05,
        result.raw.p10,
        result.raw.p25,
        result.raw.p50,
        result.raw.p75,
        result.raw.p90,
        result.raw.p95,
        result.raw.p99,
        result.raw.max,
        result.raw.average,
        result.raw.standardDeviation,
        result.raw.coefficientOfVariation,
        result.raw.IQR,
        JSON.stringify(result.raw.lowOutliers),
        JSON.stringify(result.raw.highOutliers),
        JSON.stringify(result.raw.lowFarOutliers),
        JSON.stringify(result.raw.highFarOutliers)
      ]);
      records.push([
        result.label,
        "allOutliersRemoved",
        result.allOutliersRemoved.count,
        result.allOutliersRemoved.sum,
        result.allOutliersRemoved.min,
        result.allOutliersRemoved.p01,
        result.allOutliersRemoved.p05,
        result.allOutliersRemoved.p10,
        result.allOutliersRemoved.p25,
        result.allOutliersRemoved.p50,
        result.allOutliersRemoved.p75,
        result.allOutliersRemoved.p90,
        result.allOutliersRemoved.p95,
        result.allOutliersRemoved.p99,
        result.allOutliersRemoved.max,
        result.allOutliersRemoved.average,
        result.allOutliersRemoved.standardDeviation,
        result.allOutliersRemoved.coefficientOfVariation,
        result.allOutliersRemoved.IQR,
        "n/a",
        "n/a",
        "n/a",
        "n/a"
      ]);
      records.push([
        result.label,
        "allOutliersRecoded",
        result.allOutlersRecoded.count,
        result.allOutlersRecoded.sum,
        result.allOutlersRecoded.min,
        result.allOutlersRecoded.p01,
        result.allOutlersRecoded.p05,
        result.allOutlersRecoded.p10,
        result.allOutlersRecoded.p25,
        result.allOutlersRecoded.p50,
        result.allOutlersRecoded.p75,
        result.allOutlersRecoded.p90,
        result.allOutlersRecoded.p95,
        result.allOutlersRecoded.p99,
        result.allOutlersRecoded.max,
        result.allOutlersRecoded.average,
        result.allOutlersRecoded.standardDeviation,
        result.allOutlersRecoded.coefficientOfVariation,
        result.allOutlersRecoded.IQR,
        "n/a",
        "n/a",
        "n/a",
        "n/a"
      ]);
    }
  );
}
writeFile(
  `bench-baby-bench-${
    Date.now()
  }.csv`,
  records.map(
    a => a.map(
      b => `"${
        String(b).replace(
          "\"",
          "\"\""
        )
      }"`
    ).join(",")
  ).join("\n")
).then(
  () => {
    console.log("done");
  }
)
