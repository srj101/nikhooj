export function likesBy(names) {
  if (names.length === 1) {
    return `${names[0].name.split(" ")[0]} hearted this`;
  } else if (names.length === 2) {
    return `${names[0].name.split(" ")[0]} and ${
      names[1].name.split(" ")[0]
    } hearted this`;
  } else if (names.length === 3) {
    return `${names[0].name.split(" ")[0]}, ${
      names[1].name.split(" ")[0]
    } and ${names[2].name.split(" ")[0]} heart this`;
  } else if (names.length === 0) {
    return "Be the first to heart it";
  } else {
    return `${names[0].name.split(" ")[0]}, ${
      names[1].name.split(" ")[0]
    } and ${names.length - 2} others heart this`;
  }
}
