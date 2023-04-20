import {
  faBicycle,
  faRoute,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";
export function getWegeartIcon(wegeart) {
  let iconV;
  switch (wegeart) {
    case "mit dem Rad":
      iconV = faBicycle;
      break;
    case "zu Fuß":
      iconV = faWalking;
      break;
    default:
      iconV = faRoute;
      break;
  }
  return iconV;
}
