#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("HKth2MF3hxUmwBis4xSiw7jC6duX4LQrRYd2JRvQ1Z4n");

#[program]
pub mod letter {
    use super::*;
    pub fn create_letter(ctx: Context<CreateLetter>, title: String, message: String) -> Result<()> {
        let letter_entry = &mut ctx.accounts.letter_entry;
        letter_entry.owner = *ctx.accounts.owner.key;
        letter_entry.title = title;
        letter_entry.message = message;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateLetter<'info> {
    #[account(
        init,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        space = 8 * LetterState::INIT_SPACE,
        payer = owner
    )]
    pub letter_entry: Account<'info, LetterState>,

    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct LetterState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub title: String,
    #[max_len(200)]
    pub message: String,
}
