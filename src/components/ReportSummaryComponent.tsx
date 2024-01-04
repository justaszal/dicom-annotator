import React, { useState, useEffect } from "react";

interface Props {
  annotationCount: number;
  successCount: number;
  onSuccessfullRequest: () => void;
  summaryText: string;
  onSummaryTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type SummaryStatus = "" | "mutating" | "success" | "error";

export default function ReportSummaryComponent(props: Props) {
  const [summaryStatus, setSummaryStatus] = useState<SummaryStatus>("");

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (props.summaryText === "" || props.annotationCount === 0) {
        return;
      }

      setSummaryStatus("mutating");

      const url = `https://mocki.io/v1/3dd330f6-dabc-46e7-8763-be8c977f1667?text=${props.summaryText}&annotations=${props.annotationCount}`;
      const resp = await fetch(url);

      if (resp.ok) {
        setSummaryStatus("success");
        props.onSuccessfullRequest();
      } else {
        setSummaryStatus("error");
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [props.summaryText]);

  return (
    <>
      <input
        style={{ width: "512px", height: "512px", border: "1px solid black" }}
        value={props.summaryText}
        onChange={props.onSummaryTextChange}
        placeholder={"summary"}
      ></input>
      <span style={{ margin: "10px", color: "red" }}>
        {summaryStatus === "success" && props.successCount > 0
          ? `${summaryStatus}(${props.successCount})`
          : null}
        {summaryStatus === "error" ? `${summaryStatus}` : null}
      </span>
    </>
  );
}
