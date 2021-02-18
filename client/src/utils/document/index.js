import React from "react";
import { PDFDownloadLink, Text, Document, Page } from "@react-pdf/renderer";

//API call to read from database?

const example = {
  userId: "mEOfYqMX14eTKymODesyqTTZ8Fh2",
  title: "Food Distribution Supplies",
  category: ["Food"],
  contents: [
    {
      item: "takeout boxes - all sizes",
      quantity: "10",
    },
    {
      item: "coffee cups - 12 oz, paper, insulated",
      quantity: "10",
    },
    {
      item: "disposable spoons and forks",
      quantity: "10",
    },
  ],
  postType: "Give",
  status: "approved",
  location: {
    type: "Point",
    coordinates: [-122.11935698105621, 47.67481344133391],
  },
  createDate: "2021-02-14 12:00:57.963Z",
};

const MyDoc = () => (
  <Document>
    <Page wrap>
      <Text>{example.title}</Text>
      <Text>
        {example.contents.map((line) => {
          return line.item;
        })}
      </Text>
    </Page>
  </Document>
);

const Print = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="currentList.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  </div>
);

export default Print;
