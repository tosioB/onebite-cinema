import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // false: 404 Notfound
    // blocking: SSR 방식
    // true: SSR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback)
    return (
      <>
        <Head>
          <title>한입 시네마</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 시네마" />
          <meta
            property="og:description"
            content="한입 시네마에 등록된 영화들을 만나보세요."
          />
        </Head>
      </>
    );
  if (!movie) return "문제가 발생했습니다. 다시 시도하세요.";

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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
  );
}
