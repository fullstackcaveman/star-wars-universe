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

const CharacterCard = (props) => {
	const { character } = props;

	const classes = useStyles();

	return (
		<div className='card-container'>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia className={classes.media} image={character.image} />

					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{character.name.toLowerCase()}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

export default CharacterCard;
