import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";


// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleScrollToShoppingList = () => {
    const shoppingListElement = document.getElementById("shopping-list");
    if (shoppingListElement) {
      shoppingListElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={true}
      showStatus={false}
      autoPlay={true}
      swipeable={true}
      emulateTouch={true}
      stopOnHover={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            color: "white",
            padding: "400px 30px",
            opacity: "0",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "white",
            padding: "400px 30px",
            opacity: "0",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0)"
            position="absolute"
            top="30%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography
              variant="h4"
              color={shades.primary[500]}
              sx={{
                letterSpacing: "2px",
                fontWeight: "700",
                marginBottom: "28px",
                opacity: "1",
                position: "relative",
                textTransform: "uppercase",
              }}
            >
              NEW ITEMS
            </Typography>
            <Typography
              variant="h1"
              color={shades.secondary[500]}
              sx={{
                fontWeight: "500",
                fontSize: "72px",
                marginBottom: "30px",
              }}
            >
              Summer Sale
            </Typography>
            <Typography
              variant="h4"
              color={shades.primary[500]}
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                width: "500px",
                lineHeight: "28px",
                opacity: "1",
                textAlign: "left",
                marginBottom: "40px",
              }}
            >
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality.
            </Typography>
            <Button
              onClick={handleScrollToShoppingList}
              sx={{
                padding: "20px",
                borderRadius: "1px",
                textAlign: "left",
                backgroundColor: "rgba(0, 0, 0, 1)",
                position: "absolute",
                marginTop: "30px",
              }}
            >
              <Box
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                color={shades.neutral[100]}
              >
                DISCOVER MORE
              </Box>
            </Button>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
