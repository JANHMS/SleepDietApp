import image from'../images/sleepimg.png';

const HeaderImage = () => { 
  return(
    <div style={{
      textAlign: "center",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "100px"}}>
      <img src={image} />
    </div>
  )
}

export default HeaderImage;
