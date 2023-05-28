// MIT License: https://github.com/openwebbuild/bos-emoji-search/blob/main/LICENSE

const accountId = props.accountId || context.accountId;

function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "emoji-search.near",
        nodeUrl: "https://rpc.mainnet.near.org",
      };
    case "testnet":
      return {
        ownerId: "emoji-search.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

function loadEmojis() {
  const res = fetch(
    "https://raw.githubusercontent.com/ahfarmer/emoji-search/master/src/emojiList.json"
  );
  return res.body && JSON.parse(res.body);
}

function filterEmoji(searchText, maxResults) {
  return emojiList
    .filter((emoji) => {
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      }
      if (emoji.keywords.includes(searchText)) {
        return true;
      }
      return false;
    })
    .slice(0, maxResults);
}

const emojiList = loadEmojis();
console.log("emoji list", emojiList);

State.init({
  filteredEmoji: filterEmoji("", 20),
});

const handleSearchChange = (event) => {
  State.update({
    filteredEmoji: filterEmoji(event.target.value, 20),
  });
};

return (
  <div>
    <Widget src={`${config.ownerId}/widget/Header`} />
    <Widget
      src={`${config.ownerId}/widget/SearchInput`}
      props={{ textChange: handleSearchChange }}
    />
    <div>
      {state.filteredEmoji.map((emoji) => (
        <Widget
          src={`${config.ownerId}/widget/EmojiResultRow`}
          props={{
            symbol: emoji.symbol,
            title: emoji.title,
          }}
        />
      ))}
    </div>
  </div>
);
