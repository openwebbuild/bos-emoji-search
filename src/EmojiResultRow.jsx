// MIT License: https://github.com/openwebbuild/bos-emoji-search/blob/main/LICENSE

const { symbol, title } = props;

const Row = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  position: relative;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  img {
    width: 32px;
    height: 32px;
  }

  .title {
    position: relative;
    top: 2px;
    padding: 0 10px;
  }

  .info {
    float: right;
    position: relative;
    top: 8px;
    right: 10px;
    color: #ccc;
    display: none;
  }

  &:hover .info {
    display: inline-block;
  }
`;

const codePointHex = symbol.codePointAt(0).toString(16);
const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;

const onClick = () => {
  clipboard.writeText(symbol);
};

return (
  <Row onClick={onClick}>
    <img alt={title} src={src} />
    <span className="title">{title}</span>
    <span className="info">Click to copy emoji</span>
  </Row>
);
