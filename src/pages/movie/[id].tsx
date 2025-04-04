import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
      { params: { id: "10" } },
      { params: { id: "11" } },
      { params: { id: "12" } },
      { params: { id: "13" } },
      { params: { id: "14" } },
      { params: { id: "15" } },
      { params: { id: "16" } },
      { params: { id: "17" } },
      { params: { id: "18" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!movie) return "문제가 발생했습니다. 다시 시도하세요..";
  const {
    title,
    releaseDate,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
        className={style.cover_img_container}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.releaseDate}>
        {releaseDate}&nbsp;/&nbsp;
        {genres.map((genre, index) => (
          <span key={index}>
            {genre}
            {index < genres.length - 1 && ", "}&nbsp;
          </span>
        ))}
        &nbsp;/&nbsp;
        {runtime}
      </div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
