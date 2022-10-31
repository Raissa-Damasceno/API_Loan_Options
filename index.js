const axios = required("axios");

const category = process.argv[2];
const limit = process.argv[3];

const categoryArr = [
  "Animals",
  "Anime",
  "Blockchain",
  "Books",
  "Business",
  "Calendar",
  "Weather",
  "Transportation",
  "Health",
  "Jobs",
  "Music",
];

if (limit < 1 || !categoryArr.includes(category)) {
  console.log("No Result");
  process.exit();
}

const entries = axios
  .get("https://api.publicapis.org/entries")
  .then((response) => {
    return response.data.entries;
  })
  .catch((error) => {
    console.log(error);
  });

entries.then((result) => {
  const categoryList = result.filter((r) => {
    return r.Category === category;
  });
  if (categoryList.length === 0) {
    console.log("No");
    process.exit();
  }
  const reverseList = categoryList.reverse();
  if (reverseList.length <= limit) {
    console.log(reverseList);
    process.exit();
  }
  for (let i = 0; i < limit; i++) {
    console.log(reverseList[i]);
  }
});
