// import React, { useState, useEffect } from "react";
import React from "react";

import {
  PDFDownloadLink,
  Text,
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";

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

// Create styles
const styles = StyleSheet.create({
  page: {
    margin: 10,
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDoc = () => (
  // getData(),
  <Document>
    <Page size="A4">
      {/* <Text>{listingData}</Text> */}

      <Text>{example.title}</Text>
      <Text style={styles.page}>
        {example.contents.map((line) => {
          return <Text> {line.quantity + " " + line.item + "\n "} </Text>;
        })}
      </Text>
    </Page>
  </Document>
);

const Print = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="example.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download pdf now!"
      }
    </PDFDownloadLink>
  </div>
);

export default Print;
