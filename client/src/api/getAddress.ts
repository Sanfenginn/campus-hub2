import axios from "axios";

const getAddress = async (input: string) => {
  console.log("开始搜索地址");
  const url = process.env.NEXT_PUBLIC_API_URL + "/get-addresses";
  console.log("url: ", url);
  const response = await axios.get(url, {
    params: { input },
  });
  console.log("response.data: ", response.data);

  //可选链操作符
  //在访问嵌套对象属性之前，应该检查每个属性是否存在。
  const addressDetails = response.data.message?.query?.parsed || {};

  const formatted = response.data.message.features.map(
    (feature: any) => feature.properties.formatted
  );

  return { formatted, addressDetails };
};

export default getAddress;
