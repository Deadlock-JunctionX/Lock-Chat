export const getDefaultPhoneNum = (email: string | null | undefined) => {
  switch (email) {
    case "phan.ngoclan58@gmail.com":
      return "0949791149";
    case "vietyb00@gmail.com":
      return "0886272382";
    case "tuanbm183653@gmail.com":
      return "0389020687";
    case "hson7820.fpt@gmail.com":
      return "0365906800";
    case "sonhh.7820@gmail.com":
      return "0365906800";
    default:
      return "0389020687";
  }
};

export const getDefaultBankNum = (email: string | null | undefined) => {
  switch (email) {
    case "phan.ngoclan58@gmail.com":
      return "9518274981274189274";
    case "vietyb00@gmail.com":
      return "1230587190283758900";
    case "tuanbm183653@gmail.com":
      return "1235677512390458712";
    case "hson7820.fpt@gmail.com":
      return "5123805871230895700";
    case "sonhh.7820@gmail.com":
      return "1235871238905712893";
    default:
      return "21035721348976201346";
  }
}