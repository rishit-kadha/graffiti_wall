const Create = ({ onClick }: { type: "free" | "prompt"; onClick: () => void }) => (
  <button className="btn-primary" onClick={onClick}>
    + Draw &amp; Publish
  </button>
);

export default Create;
