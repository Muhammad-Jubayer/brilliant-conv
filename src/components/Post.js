export default function Post({ heading, desc, reacts, comments }) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{desc}</p>
      <div className="response">
        <p>{reacts} Votes</p>
        <p>{comments} Comments</p>
      </div>
    </div>
  );
}
