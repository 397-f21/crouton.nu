

const TermSelector = ({setTool}) => {

    const tools = ["Course Explorer", "Path Recommendation", "All Courses"];
    return (
        <div className="btn-group">
        { 
            tools.map(tool => <ToolButton key={tool} tool={tool} setTool={setTool}/>)
        }
        </div>
    )
};


const ToolButton = ({tool, setTool}) => (
    <>
      <button className="btn btn-outline-secondary btn-sm m-1" onClick={() => setTool(tool)}>
                {tool}
      </button>
    </>
);

export default TermSelector;
