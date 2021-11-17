

const ToolSelector = ({ setTool, toolState }) => {

    const tools = ["Course Explorer", "Path Recommendation", "All Courses"];
    return (
        <div className="btn-group">
            {
                tools.map(tool => <ToolButton key={tool} tool={tool} setTool={setTool} toolState={toolState} />)
            }
        </div>
    )
};


const ToolButton = ({ tool, setTool, toolState }) => {
    const classes = 'btn btn-outline-secondary btn-sm m-1' + (toolState === tool ? ' active' : '');
    return (
        <button className={classes} onClick={() => setTool(tool)}>
            {tool}
        </button>
    )
}
export default ToolSelector;
