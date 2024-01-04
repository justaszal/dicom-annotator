interface Props {
  annotationCount: number;
}

export default function CSAnnotations(props: Props) {
  return <div>There are {props.annotationCount} annotations completed!</div>;
}
