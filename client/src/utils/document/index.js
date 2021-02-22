// import React, { useState, useEffect } from "react";
import React from "react";
import icon from "./pdficon.png";
import {
  PDFDownloadLink,
  Text,
  Document,
  Page,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register font
Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css?family=Open+Sans|Roboto",
});

// Create styles
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    margin: 10,
    padding: 10,
  },

  line: {
    borderBottom: "grey",
    borderBottomWidth: 1,
  },

  heading: {
    // flexDirection: "row",
    backgroundColor: "#5C415D",
    height: "2cm",
    textAlign: "center",
    color: "#AEA0AE",
    borderBottom: "red",
    borderBottomWidth: 5,
    // margin: 20,
    paddingTop: 10,
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  title: {
    fontSize: 18,
    textAlign: "left",
    fontWeight: "semibold",
    margin: 10,
    // fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
  },
  date: {
    fontSize: 11,
    textAlign: "center",
    color: "#AEA0AE",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

//Getting today's date
let today = new Date();

const MyDocument = (props) => (
  <Document>
    <Page size="LETTER" wrap>
      <Text style={styles.heading}>
        AidExchange
        <Text style={styles.date}>
          {"\n"}
          Date:{" "}
          {`${
            today.getMonth() + 1
          } / ${today.getDate()} / ${today.getFullYear()}`}
        </Text>
      </Text>

      <Text style={styles.title}> Hello {props.displayName}</Text>

      <Text style={styles.subtitle}>
        {props.postType}ed item's list for: {props.title}{" "}
      </Text>

      <Text style={styles.content}>
        {props.contents.map((line, i) => {
          return (
            <Text style={styles.line} key={i}>
              {line.quantity + "--" + line.item + "\n "}{" "}
            </Text>
          );
        })}
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
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
            postType={props.listing.postType}
            displayName={props.listing.postBy.displayName}
            title={props.listing.title}
            contents={props.listing.contents}
            status={props.listing.status}
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
              style={{ float: "right", marginBottom: "10px" }}
            />
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Print;
