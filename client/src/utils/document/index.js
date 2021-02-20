// import React, { useState, useEffect } from "react";
import React from "react";
import icon from "./pdficon.png";
import {
  PDFDownloadLink,
  Text,
  Document,
  Page,
  StyleSheet,
} from "@react-pdf/renderer";

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
  title: {
    // big and bold?
  },
});

const MyDocument = (props) => (
  <Document>
    <Page size="A4">
      <Text style={styles.heading}>{props.title}</Text>
      <Text style={styles.page}>
        {props.contents.map((line, i) => {
          return (
            <Text key={i}> {line.quantity + " " + line.item + "\n "} </Text>
          );
        })}
      </Text>
    </Page>
  </Document>
);

const Print = (props) => {
  console.log("Listing: ", props.listing);

  return (
    <div>
      <PDFDownloadLink
        // key={listing.userId}
        document={
          <MyDocument
            title={props.listing.title}
            contents={props.listing.contents}
          />
        }
        fileName="example.pdf"
      >
        {/* <img src="pdficon.png" /> */}

        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <img
              src={icon}
              width="35"
              height="35"
              style={{ float: "right", marginBottom: "1%" }}
            />
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Print;
