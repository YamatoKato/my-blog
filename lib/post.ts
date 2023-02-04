import path from "path";
import fs from "fs";
import matter from 'gray-matter';
import {remark}  from "remark";
import html from "remark-html";


export interface MdFileData{
  id: string,
  title: string,
  date: string,
  thumbnail: string
}

// postディレクトリのパスを取得する。
const postsDirectory = path.join(process.cwd(),"posts");

// mdファイルのデータを取り出す。
export function getPostsData(){
  const fileNamesArray = fs.readdirSync(postsDirectory);
  return fileNamesArray.map((fileName: string)=>{
    const id = fileName.replace(/\.md$/,""); // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory,fileName);
    const fileContents = fs.readFileSync(fullPath,"utf8");

    // title,date,thumbnailがオブジェクトで入っている。
    const matterResult = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    }
  })
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds(){
  const fileNamesArray = fs.readdirSync(postsDirectory);
  return fileNamesArray.map((fileName)=>{
    return {
      params: {
        id: fileName.replace(/\.md$/,""), // ファイル名(id)
      }
    }
  });
}


// idに基づいてブログ投稿データを返す
export async function getPostData(id:string){
  const fullPath = path.join(postsDirectory,`${id}.md`);
  const fileContents = fs.readFileSync(fullPath,"utf8");

  const matterResult = matter(fileContents);

  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data
  }
}
