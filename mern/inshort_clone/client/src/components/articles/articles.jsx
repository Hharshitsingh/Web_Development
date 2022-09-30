import { Box, LinearProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getArticles } from '../../service/api';
import Article from './article';
import InfiniteScroll from 'react-infinite-scroll-component';


const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const news = async () => {
            let res = await getArticles(page);
            console.log(new Set([...articles, ...res.data]));
            setArticles([...new Set([...articles, ...res.data])]);
            // console.log(res.data);
        }
        news();
    }, [page]);

    useEffect(() => {
        console.log(articles);
    }, [page]);

    return (

        <InfiniteScroll
            dataLength={articles.length}
            next={() => setPage(page + 1)}
            hasMore={true}
            loader={
                <Box>
                    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress color="secondary" />
                        <LinearProgress color="success" />
                        <LinearProgress color="inherit" />
                    </Stack>
                </Box>
            }
        >

            <Box>
                {
                    articles.map((article, index) => {
                        return (
                            <Article key={index} article={article} />
                        )
                    }
                    )
                }
            </Box>
        </InfiniteScroll>
    );
}

export default Articles;