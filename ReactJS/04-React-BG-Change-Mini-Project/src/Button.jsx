export default function Button({color, setColor}) {
    function isLightColor(color) {
        const lightColors = ["yellow", "pink", "lavender", "white"];
        return lightColors.includes(color);
    }
    const textColor = isLightColor(color) ? "black" : "white";

    return (
        <button className="ml-2 mr-2 p-1 pl-3 pr-3 rounded-2xl  border-[1px] border-grey" style={{backgroundColor: color, color: textColor}} onClick={() => setColor(color)}>{color[0].toUpperCase()}{color.slice(1)}</button>
    )
}