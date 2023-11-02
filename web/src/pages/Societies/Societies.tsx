import Society from "./Society";
import { SocietiesData, SocietyData } from "@/types";

export default function Societies({ SOCIETIES }: SocietiesData) {
  return (
    Object.values(SOCIETIES).map((society: SocietyData, index) => (
      <Society
        key={index}
        {...society}
      />
    ))
  );
}
