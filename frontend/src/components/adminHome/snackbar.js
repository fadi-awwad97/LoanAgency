
// import React,{useState,useEffect} from 'react';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

// export default function SimpleSnackbar(data) {
//   const [open, setOpen] = React.useState(false);
//   const [name, setName] =useState("");
  
//   useEffect(() => {
//     // handleClick();
//     // if(!data.reciever.sender.uid)
//     // console.log(data.reciever.sender.uid)
//     if(data.reciever ===""){
//         // console.log("hello from snack")
//     }
//     else{
//       setName(data.reciever.sender.uid)
//       handleClick()
//     }
    
//     // console.log("from snackbar"+data.reciever.sender.uid)
//     // setName(data.reciever.sender.uid)
//     // handleClick()
    
    
//   }, [data]);

  

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
  
//   return (
//     <div>
//       {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
//       <Snackbar
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         message={<Grid>
//             <Typography>Message Recieved from </Typography>
//             <Typography style={{color:"red"}}>{name} </Typography>
//             </Grid> }
        
//         action={
//           <React.Fragment>
//             {/* <Button color="secondary" size="large" onClick={handleClose}>
//               {name}
//             </Button> */}
//             <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
//               <CloseIcon fontSize="small" />
//             </IconButton>
//           </React.Fragment>
//         }
//       />
//     </div>
//   );
// }