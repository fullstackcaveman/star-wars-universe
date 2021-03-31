import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	media: {
		height: 275,
	},
});

const SpeciesCard = (props) => {
	const { species } = props;

	const classes = useStyles();

	return (
		<div className='card-container'>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia className={classes.media} image={species.image} />

					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{species.name.toLowerCase()}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

export default SpeciesCard;
