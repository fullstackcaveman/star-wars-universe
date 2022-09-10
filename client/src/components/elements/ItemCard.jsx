import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
	media: {
		height: 275,
	},
});

const ItemCard = ({ item }) => {
	const classes = useStyles();

	return (
		<div className='card-container'>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia className={classes.media} image={item.image} />
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{!item.name ? item.title.toLowerCase() : item.name.toLowerCase()}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

export default ItemCard;
