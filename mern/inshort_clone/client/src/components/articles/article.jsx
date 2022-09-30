import { Box, Card, CardContent, Grid, Typography, styled } from "@mui/material";
import { margin } from "@mui/system";
import { Link } from "react-router-dom";


const Image = styled('img')({
    height: 200,
    width: '80%',
    objectFit: 'cover',
    borderRadius: '5px',
    margin: 'auto'
});

const Component = styled(Card)`
    margin-bottom: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const Content = styled(CardContent)`
    padding: 10px;
    color: blue;
    background-color: #f5f5f5;
    padding-bottom: 4px !important;
`

const RightContainer = styled(Grid)(({ theme }) => ({
    margin: '5px 0px 0 -25px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.between('sm', 'lg')]: {
        padding: '0 5px'
    },
    [theme.breakpoints.down('sm')]: {
        margin: '5px 0'
    }
}));

const Title = styled(Typography)`
    font-weight: 300;
    color: #44444d;
    font-size: 22px;
    line-height: 27px;
`;

const Author = styled(Typography)`
    color: #808290;
    font-size: 12px;
    line-height: 22px;
`;

const Description = styled(Typography)`
    line-height: 22px;
    color: #44444d;
    margin-top: 5px;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
`;

const Short = styled('b')({
    color: '#44444d',
})

const Publisher = styled(Typography)`
    font-size: 12px;
    margin-top: auto;
    margin-bottom: 10px;
    '& > *': {
        textDecoration: 'none',
        color: '#000',
        fontWeight: 900
    }
`;

const AnchorTag = styled('a')({
    textDecoration: 'none',
    color: '#000',
    fontWeight: 600

})

const Article = ({ article }) => {
    return (
        <Component>
            <Content>
                <Grid container spacing={2}>
                    <Grid lg={5} md={5} sm={5} xs={12} item style= {{display: 'flex'}}>
                        <Image src={article.urlToImage} alt={article.title} />
                    </Grid>
                    <RightContainer lg={7} md={7} sm={7} xs={12} item>
                        <Title>{article.title}</Title>
                        <Author>
                            <Short>Author</Short> by {article.author} / {new Date(article.publishedAt).toDateString()}
                        </Author>
                        <Description>{article.description}</Description>
                        <Publisher>
                            <AnchorTag href={article.url} target='_blank'>read more</AnchorTag>
                        </Publisher>
                    </RightContainer>
                </Grid>
            </Content>
        </Component>
    )
}

export default Article;
