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
  heading: {
    backgroundColor: "#5c415d",
    height: "2cm",
    textAlign: "center",
    color: "white",
    borderBottom: "#AEA0AE",
    borderBottomWidth: 3,
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
    marginLeft: 40,
    marginTop: 15,
    marginRight: 40,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 40,
    marginTop: 5,
    marginRight: 40,
    marginBottom: 5,
  },
  date: {
    fontSize: 11,
    textAlign: "center",
    color: "white",
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
    marginLeft: 40,
    marginTop: 5,
    marginRight: 50,
    marginBottom: 5,
    fontSize: 14,
  },

  line: {
    border: 2 | "solid",
    borderColor: "grey",
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
        {props.postType}ed items for: {props.title}{" "}
      </Text>

      <Text style={styles.content}>
        <Text> Quantity {"    "} Description</Text>
        <Text>
          {"\n"}
          ------------------------------------------------------- {"\n"}{" "}
        </Text>
        {props.contents.map((line, i) => {
          return (
            <Text style={{ borderBottomWidth: 2, border: "solid" }} key={i}>
              {" "}
              {line.quantity + "            " + line.item + "\n "}
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
        className="d-inline-block"
        document={
          <MyDocument
            postType={props.listing.postType}
            displayName={props.listing.postBy.displayName}
            title={props.listing.title}
            contents={props.listing.contents}
            status={props.listing.status}
          />
        }
        fileName="AidExchange Transaction.pdf"
      >
        {({ loading }) =>
          loading ? (
            "Loading document..."
          ) : (
            <img
              src={icon}
              width="35"
              height="35"
                style={props.iconStyle}
              alt="PDF icon to print a packing list"
            />
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Print;
