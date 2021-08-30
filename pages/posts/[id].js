import Layout from '../../components/layout'
import { getPostdata, getAllPostIds } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post({postData}) {
  return (<Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    
    <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
  </Layout>)
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    // Possible values for id 가능안 아이디 목록을 보냅니다. 다시말해 가능한 paths들을 보냅니다.
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false
    }
}
  
export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostdata(params.id)

  return {
    props: {
      postData
    }
  }
}