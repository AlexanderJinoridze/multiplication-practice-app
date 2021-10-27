import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function TipsPage() {
    return(
        <>
            <Navbar />
            <main className="max-w-3xl">
                <h2 className="text-center font-display mb-2">Tips & Tricks</h2>
                <span className="text-pale text-center mb-12">This list of useful tips & tricks will help you memorise multiplication table</span>
                <div className="tips-list-container">
                    <div>
                        <h4>Tip #1. Multiplying by 1</h4>
                        <div className="text-block">
                            <p>Whatever number you are trying to multiply by 1 it always will be that number. For example:</p>
                            <h5 className="my-1 text-center">1 x 1469</h5>
                            <p>Equals 1469 because we are multiplying it by 1.</p>
                            <p>And BTW whatever you multiply by 0 will equal 0.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #2. Multiplying by 10</h4>
                        <div className="text-block">
                            <p>Multiplying by 10 reminds multiplying by 1 only thing you have to do is to add 0 at the end of the resulting number so for example:</p>
                            <h5 className="my-1 text-center">10 x 4681</h5>
                            <p>Equals 4681 and 0 added at the end of it so it equals 46810.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #3. Multiplying by 5</h4>
                        <div className="text-block">
                            <p>When you multiply by 5, first of all, you have to consider are you multiplying by an even number (even number is divisible by 2 with no remainders left) or an odd number (odd number is divisible by two with a remainder of 1).</p>
                            <p>If you multiply by an even number first of all you have to cut that number in half (So for 6 is 3, for 8 is 4, for 10 is 5, and so on) and then you have to add 0 to it, for example:</p>
                            <h5 className="my-1 text-center">5 x 4</h5>
                            <p>Equals 20 we cut 4 in half which equals 2 and merge 0 to it.</p>
                            <p>When multiplying 5 by an odd number first of all you have to subtract 1 from that number cut the result in half and merge 5 to it, for example:</p>
                            <h5 className="my-1 text-center">5 x 7</h5>
                            <p>It equals 35 so we took 7 subtract 1 from that we got 6 then cut that 6 in half we got 3 and then we merge 5 to that 3.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #4. Multiplying 9 by 1 digit number</h4>
                        <div className="text-block">
                            <p>When multiplying 1 digit number by 9 you have to subtract 1 from that number and merge to it number which is needed to get 9, for example:</p>
                            <h5 className="my-1 text-center">9 x 8</h5>
                            <p>The answer is 72, we take 8 subtract 1 from it which gives us 7 after that we merge to that 7 the number which is needed to get 9(in this case 2), so basically we subtract that 7 from 9.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #5. Multiplying 9 by numbers from 12 to 20</h4>
                        <div className="text-block">
                            <p>When multiplying numbers from 12 to 20 by 9 you have to subtract 2 from that number and merge to it a number which is needed to get 18, for example:</p>
                            <h5 className="my-1 text-center">9 x 16</h5>
                            <p>The answer is 144, we take 16 subtract 2 from it which gives us 14 after that we merge to that 14 the number that is needed to get 18(in this case 4), so basically we subtract that 14 from 18.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #6. Multiplying 11 by 1 digit number</h4>
                        <div className="text-block">
                            <p>When multiplying 11 by 1 digit number you just take that number and duplicate it 2 times, for example:</p>
                            <h5 className="my-1 text-center">11 x 7</h5>
                            <p>Gives us 77, simple as that no explanation is needed.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #7. Multiplying 11 by 2 digit number</h4>
                        <div className="text-block">
                            <p>When multiplying 11 by 2 digit numbers you just write that number and put the sum of each individual digit in the center, for example:</p>
                            <h5 className="my-1 text-center">11 x 15</h5>
                            <p>Gives us 165, the first digit is 1(first digit of 15), the second digit is 6(sum of 1 and 5), the third digit is 5(second digit of 15).</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #8. Multiplying by 2</h4>
                        <div className="text-block">
                            <p>Multiplication by 2 is just a simple addition problem, for example:</p>
                            <h5 className="my-1 text-center">2 x 4</h5>
                            <p>That gives us 8 so basically, we just add 4 to the 4.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #9. Multiplying by 3 and 4</h4>
                        <div className="text-block">
                            <p>Unfortunately, there is no magical tip for multiplying 3's and 4's by any 1 digit number you just need to remember it.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #10. Multiplying by 20</h4>
                        <div className="text-block">
                            <p>Multiplying by 20 reminds multiplying by 10 and multiplying by 2, when multiplying by 20 just multiply by 2 and then merge 0 to it, for example:</p>
                            <h5 className="my-1 text-center">20 x 9</h5>
                            <p>This equals 180, multiply 9 by 2 and merge 0 to it.</p>
                        </div>
                    </div>
                    <div>
                        <h4>Tip #11. Multiplying numbers 6, 7 and 8</h4>
                        <div className="text-block">
                            <p>Multiplying 6, 7 and 8 by each other has to be taught by heart, sorry no way around it.</p>
                            <p>The only tip that can be used here is when you multiply 7 and 8 by each other it gives 56 so we have nice looking equation 56=7x8</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}